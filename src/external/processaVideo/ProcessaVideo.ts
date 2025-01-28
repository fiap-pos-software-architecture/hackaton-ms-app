import { execFile } from "child_process";
import fs from "fs-extra";
import path from "path";
import archiver from "archiver";
import { Constantes } from "./Constantes";
import { throws } from "assert";

// TODO: salvar em variável de ambiente
const FFPROBE_PATH = Constantes.FFPROBE_PATH
const FFMPEG_PATH = Constantes.FFMPEG_PATH

export const capturaScreenshot = async (
  listaVideos: string[],
  intervaloSegundos: number
): Promise<void> => {

  if (verificaDuplicados(listaVideos)) {
    throw new Error(
      "A lista possui dois arquivos com o mesmo nome. Renomeie."
    );
  }
  
  // Processamento paralelo dos vídeos
  const processos = listaVideos.map(
    async (videoPath: string, index: number) => {
      const nomeArquivo = path.parse(videoPath).name;
      console.log("Vídeo " + (index + 1) + ": " + nomeArquivo + " -> Iniciado");

      const pastaTemporariaDeScreenshots = path.resolve(
        "Output/ScreenShots-" + nomeArquivo
      );
      const arquivoZIPDeScreenshots = path.resolve(
        "Output/ScreenShots-" + nomeArquivo + ".zip"
      );

      await deletaPasta(pastaTemporariaDeScreenshots);

      // Cria a pasta de saída, se não existir
      fs.ensureDirSync(pastaTemporariaDeScreenshots);

      try {
        const duracaoVideo = await getVideoDuration(videoPath);

        // Usando o ffmpeg para capturar múltiplos frames em um único comando
        const fps = 1 / intervaloSegundos;
        const outputPattern = path.join(
          pastaTemporariaDeScreenshots,
          "frame_%04d.jpg"
        );
        // Captura todos os frames a cada "intervaloSegundos"
        await captureFrames(videoPath, outputPattern, fps);

        // Criação do arquivo ZIP
        const output = fs.createWriteStream(arquivoZIPDeScreenshots);
        const archive = archiver("zip", { zlib: { level: 9 } });

        archive.pipe(output);
        archive.directory(pastaTemporariaDeScreenshots, false);
        await archive.finalize();
        await deletaPasta(pastaTemporariaDeScreenshots);
      
        // TODO: CHAMAR ENDPOINT POST PARA ATUALIZAR A SITUAÇÃO DO VÍDEO | CHAMAR MENSAGERIA
        console.log("Vídeo " + (index + 1) + ": " + nomeArquivo + " -> Finalizado.");
      } catch (error) {
        console.error("Erro no processo:", error);
      }
    }
  );

  // Espera todos os vídeos serem processados
  await Promise.all(processos);
};

// Função para obter a duração do vídeo
const getVideoDuration = (videoPath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    execFile(
      FFPROBE_PATH,
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        videoPath,
      ],
      (err, stdout) => {
        if (err) {
          reject(err);
        } else {
          const duration = parseFloat(stdout.trim());
          resolve(isNaN(duration) ? 0 : duration);
        }
      }
    );
  });
};

// Função para capturar um frame
const captureFrames = (
  videoPath: string,
  outputPattern: string,
  fps: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    execFile(
      FFMPEG_PATH,
      [
        "-i",
        videoPath,
        "-vf",
        `fps=${fps}`, // Captura os frames a cada intervalo
        "-q:v",
        "2", // Qualidade da imagem
        outputPattern,
      ],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
};

// Função para verificar se a pasta existe
const pastaExiste = async (caminhoDaPasta: string): Promise<boolean> => {
  try {
    return await fs.pathExists(caminhoDaPasta);
  } catch (error) {
    console.error(`Erro ao verificar a pasta: ${error}`);
    return false;
  }
};

// Função para deletar a pasta
const deletaPasta = async (caminhoDaPasta: string): Promise<void> => {
  if (await pastaExiste(caminhoDaPasta)) {
    try {
      // Deleta a pasta e todo o seu conteúdo
      await fs.remove(caminhoDaPasta);
    } catch (error) {
      console.error(`Erro ao deletar a pasta: ${error}`);
    }
  }
};

const verificaDuplicados = (arquivos: string[]) => {
  return new Set(arquivos).size !== arquivos.length;
}
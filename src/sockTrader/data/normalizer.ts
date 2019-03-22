import fs from "fs-extra";
import path from "path";
import CandleLoader from "../core/candles/candleLoader";

const resolver = (root: string) => (folder: string, file = "") => path.resolve(__dirname, root, folder, file);
const buildPath = resolver("../../../build");

/**
 * Parse candles from candleLoader into a serializable array
 * @param candleLoader
 */
const parseCandles = async (candleLoader: CandleLoader): Promise<any> => (await candleLoader.parse());

/**
 * Normalize a single file in the "build/data" folder
 * @param file
 */
export const normalizeDataFile = async (file: string): Promise<void> => await normalizeDataFiles([file]);

/**
 * Import multiple JavaScript files from the "build/data" folder and store
 * the parsed result of each file into a JSON file. This resulting JSON file
 * should be consumable by the frontend and the BackTesting engine.
 * @param files
 */
export async function normalizeDataFiles(files: string[]): Promise<void> {
    files.forEach(async file => {
        const ext = path.extname(file);
        if (ext !== ".js") return;

        try {
            const baseFileName = path.basename(file, ext);
            const m = await import(buildPath("data", file));
            const candleLoader: CandleLoader = m.default;
            const candles = await parseCandles(candleLoader);

            await fs.writeJSON(buildPath("data", `${baseFileName}.json`), candles);
        } catch (e) {
            console.error(e);
        }
    });
}

/**
 * Normalizes all the files in the "build/data" folder
 */
export async function normalizeDataFolder(): Promise<void> {
    fs.readdir(buildPath("data"), async (err, files) => await normalizeDataFiles(files));
}

import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import type { NextApiRequest } from "next";
import { join } from "path";
import * as dateFn from 'date-fns';
import mime from "mime";
import { ImageUploadKeyValue } from "../values/GlobalValues";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
        process.env.ROOT_DIR || process.cwd(),
        `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
      );
  
      try {
        //Check if folder with timestamp exists
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
            //Create folder if it doesn't exist
            await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(e);
          reject(e);
          return;
        }
      }
      const form = formidable({
        maxFiles: 2,
        maxFileSize: 1024 * 1024 * 20, // 20mb
        uploadDir,
        filename: (_name, _ext, part) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          //New filename of the uplaoded file
          const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
            mime.getExtension(part.mimetype || "") || "unknown"
          }`;
          return filename;
        },
        filter: (part) => {
          return (
            part.name === ImageUploadKeyValue && (part.mimetype?.includes("image") || false)
          );
        },
      });
  
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });
};
import { CodeNode } from "@flyde/core";
import { readdirSync,statSync } from "fs";

export const getpath_by_extension: CodeNode = {
  id: "getpath_of_extension",
  description: "get path of specify extension",
  inputs: {
    dir:{ description: "source dir" },
    extension: { description: "File extension" },
  },
  outputs: { paths: { description: "File paths" } },
  run: async ({ extension,dir }, { paths }) => {
    const sourceDir = dir;
    const re = new RegExp("\\." + extension + '$')
    const files : string[] = []

    const filter_files = readdirRecursively(sourceDir,files)
    paths.next(filter_files.filter((value)=>(value.match(re))));
    return
  },
};

const readdirRecursively = (dir, files = []) => {
  const paths = readdirSync(dir);
  const dirs = [];
  for (const path of paths) {
    const stats = statSync(`${dir}/${path}`);
    if (stats.isDirectory()) {
      dirs.push(`${dir}/${path}`);
    } else {
      files.push(`${dir}/${path}`);
    }
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
};
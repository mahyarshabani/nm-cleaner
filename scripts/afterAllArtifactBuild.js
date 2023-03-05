const packageJson = require("./../app/package.json");
const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

exports.default = async function (context) {
  const windows = process.platform === "win32";
  if (!windows) {
    return;
  }
  const exeFilePath = path.join(
    __dirname,
    `../release/${packageJson.name}-${packageJson.version}.portable.windows.exe`
  );
  try {
    await createZipFile(exeFilePath);
    console.log(`zip of the portable file is created in `);
    console.log(path.join(__dirname, `../release`));
  } catch (err) {
    console.error("zipping file failed: \n", err);
  }
};

async function createZipFile(filePath) {
  // create a read stream from the file
  const readStream = fs.createReadStream(filePath);

  // create a write stream to the zip file
  const writeStream = fs.createWriteStream(filePath + ".zip");

  // create a gzip stream and pipe the read stream into it
  const gzip = zlib.createGzip();
  readStream.pipe(gzip).pipe(writeStream);

  // wait for the write stream to finish
  await new Promise((resolve, reject) => {
    writeStream.on("finish", () => {
      console.log("Zip file created.");
      resolve();
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}

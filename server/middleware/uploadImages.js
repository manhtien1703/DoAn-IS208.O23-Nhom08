export const base64ToFile = async (req, res, next) => {
  if (!req.body.images) {
    console.log(req.body);
    console.log(1);
    return next();
  }

  const images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];
  req.files = [];

  for (const base64String of images) {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches) continue;

    const ext = matches[1].split("/")[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");
    const filename = `${uuidv4()}.${ext}`;
    const filepath = path.join(__dirname, "uploads", filename);

    await fs.promises.writeFile(filepath, buffer);
    req.files.push({ path: filepath, filename });
  }
  next();
};

import { Router } from "express";
import { UploadedFile } from "express-fileupload";
import { extname } from "path";
import pageService from "../service/page";
import { IMAGES_DIR, SERVER_PORT } from "../utils";

const router = Router();

router.get("/", (_, res) => {
  res.send(`Express backend working`);
});

// TODO: could add validation to check if file type is of type image/jepg, image/gif, image/png
router.post(`/upload`, async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: true });
  }

  try {
    const file = req.files.file as UploadedFile;

    const fileName = `upload-file-${Date.now()}${extname(file.name)}`;
    await file.mv(`${IMAGES_DIR}/${fileName}`);

    return res.json({
      error: false,
      imgSrc: `http://localhost:${SERVER_PORT}/static/images/${fileName}`,
    });
  } catch (error) {
    return res.status(500).json({ error: true });
  }
});

router.get(`/slug/:slug`, async (req, res) => {
  const slug = req.params["slug"];

  try {
    const found = await pageService.getSlug(slug);

    res.json({ found });
  } catch (error) {
    res.json({ found: false });
  }
});

router.get(`/page/:slug`, async (req, res) => {
  const slug = req.params["slug"];

  try {
    const page = await pageService.getPage({ slug, res });

    if (!page) {
      res.sendStatus(404);
    } else {
      res.json(page);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post(`/create-edit-page`, async (req, res) => {
  // TODO: add validation here if necessary
  try {
    await pageService.insertOrUpdatePage(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error({ create_page: err });
    res.status(500).json("failed to create wiki page");
  }
});

export default router;

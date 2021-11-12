import { Router } from "express";
import pageService from "../service/page";

const router = Router();

router.get("/", (_, res) => {
  res.send(`Express backend working`);
});

router.get(`/slug/:slug`, async (req, res, next) => {
  const slug = req.params["slug"];

  try {
    const found = await pageService.getSlug(slug);

    res.json({ found });
  } catch (error) {
    res.json({ found: false });
  }
});

router.get(`/page/:slug`, async (req, res, next) => {
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

router.post(`/create-edit-page`, async (req, res, next) => {
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

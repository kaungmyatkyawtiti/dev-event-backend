import type { Request, Response, NextFunction } from 'express';
import * as eventService from "../services/eventService.ts";
import { imageKit } from '../utils/imageKit.ts';

const waitFor = async (ms: number) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

export const getAllEventsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json({
      message: "success",
      data: events
    });
  } catch (error) {
    next(error);
  }
};

export const getEventBySlugHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const event = await eventService.getEventBySlug(slug);
    res.status(200).json({
      message: "success",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const getSimilarEventHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }

    const event = await eventService.getSimilarEvent(slug);
    res.status(200).json({
      message: "success",
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const saveEventHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;

    console.log("file", file);

    if (!file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { originalname, buffer } = file;
    const { ...restFields } = req.body;

    let uploaded;
    try {
      uploaded = await imageKit.upload({
        file: buffer,
        fileName: originalname,
        folder: "DevEvent",
      });
      console.log("imageKit upload success", uploaded);
    } catch (err) {
      console.log("imageKit upload failed", err);
      return res.status(500).json({ message: "Image upload failed" });
    }

    console.log("restFields", restFields);
    const createdEvent = await eventService.saveEvent({
      ...restFields,
      image: uploaded.url,
    });

    res.status(201).json({
      message: "Success",
      data: createdEvent,
    });
  } catch (error) {
    next(error)
  }
};

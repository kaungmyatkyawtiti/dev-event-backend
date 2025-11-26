import EventModel, { type IEvent } from "../models/Event.ts";

export const getAllEvents = async () => {
  return EventModel.find();
}

export const getEventBySlug = async (slug: string) => {
  return EventModel.findOne({ slug });
}

export const getSimilarEvent = async (slug: string) => {
  const event = await getEventBySlug(slug);

  if (!event) return [];

  return EventModel.find({
    _id: { $ne: event._id },
    tags: { $in: event.tags }
  })
}

export const getEventById = async (eventId: string) => {
  return EventModel.findById(eventId);
};

export const saveEvent = async (event: IEvent) => {
  const newEvent = new EventModel(event);
  return newEvent.save();
}

export const updateEvent = async (eventId: string, event: IEvent) => {
  return EventModel.findByIdAndUpdate(
    eventId,
    event,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );
}

export const deleteEvent = async (eventId: string) => {
  return EventModel.findByIdAndDelete(eventId);
}

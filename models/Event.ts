import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
    trim: true,
  },
  overview: {
    type: String,
    required: [true, 'Overview is required'],
    maxlength: [500, 'Overview cannot exceed 500 characters'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  mode: {
    type: String,
    required: [true, 'Mode is required'],
    enum: {
      values: ['online', 'offline', 'hybrid'],
      message: 'Mode must be either online, offline, or hybrid',
    },
  },
  audience: {
    type: String,
    required: [true, 'Audience is required'],
    trim: true,
  },
  agenda: {
    type: [String],
    required: [true, 'Agenda is required'],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'At least one agenda item is required',
    },
  },
  organizer: {
    type: String,
    required: [true, 'Organizer is required'],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
    validate: {
      validator: (v: string[]) => v.length > 0,
      message: 'At least one tag is required',
    },
  },
}, {
  timestamps: true,
});

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // remove leading/trailing hyphens

const normalizeDate = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  return date.toISOString().slice(0, 10);
}

const normalizeTime = (timeString: string): string => {
  const match = timeString.trim().match(/^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i);

  if (!match) {
    throw new Error("Invalid time format. Use HH:MM or HH:MM AM/PM");
  }

  let hours = parseInt(match[1]!);
  const minutes = match[2]!;
  const period = match[4]?.toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const mins = parseInt(minutes);

  if (hours < 0 || hours > 23 || mins < 0 || mins > 59) {
    throw new Error("Invalid time values");
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

EventSchema.pre("save", function() {
  const event = this as IEvent;

  if (event.isModified("title") || event.isNew) {
    event.slug = generateSlug(event.title);
  }

  if (event.isModified("date")) {
    event.date = normalizeDate(event.date);
  }

  if (event.isModified("time")) {
    event.time = normalizeTime(event.time);
  }
});

EventSchema.index({ date: 1, mode: 1 });

const Event = model<IEvent>('Event', EventSchema);

export default Event;

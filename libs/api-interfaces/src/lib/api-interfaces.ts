export interface Message {
  message: string;
}

// TODO update this type to be the specific mime types
type MimeType = string;

// TODO more specific type
type MediaResolution = string;

type URL = string;

type MediaFormat = {
  mimeType: MimeType;
  resolution: MediaResolution;
};

// TODO define metadata model
type MediaMetadata = Record<string, string>;

type AvailableMediaFormatAndLink = {
  format: MediaFormat;
  url: URL;
};

export interface MediaItem {
  filename: string;
  meta: MediaMetadata;
  availableFormats: AvailableMediaFormatAndLink[];
}

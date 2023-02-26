// src/api/type.ts

export type Session = {
  token: string;
  expireDatetime: Date;
};

export type User = {
  isAdmin: boolean;
  account: string;
  registerDatetime: Date;
  lastLoginDatetime: Date;
  bookmark: {
    novel: Record<string, Bookmark>;
    comic: Record<string, Bookmark>;
  };
};

export type ChapterInfo = {
  title: string;
  url: string;
};

export type Chapter = {
  index: number;
  title?: string;
  content: string;
};

export type BookInfo = {
  isEnable: boolean;
  title: string;
  author: string;
  description: string;
  cover_url: string; // eslint-disable-line camelcase
  lastCrawlTime: Date;
};

export type Book = BookInfo & {
  dns: string;
  url: string;
  chapters: Array<ChapterInfo>;
};

export type NovelInfo = BookInfo & {
  novelID: string;
};

export type ComicInfo = BookInfo & {
  comicID: string;
};

export type Novel = NovelInfo & Book;

export type Comic = ComicInfo & Book;

export type Bookmark = {
  type: 'Novel' | 'Comic';
  ID: string;
  lastReadIndex: number;
  lastReadDatetime: Date;
};

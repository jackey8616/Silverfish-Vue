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

type ChapterInfo = {
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

export type Novel = Book & {
  novelID: string;
};

export type Comic = Book & {
  comicID: string;
};

export type Bookmark = {
  type: 'Novel' | 'Comic';
  ID: string;
  lastReadIndex: number;
  lastReadDatetime: Date;
};

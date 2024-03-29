export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type commiteeType = {
  name: string;
  email: string;
  availableTimes: [
    {
      start: string;
      end: string;
    },
  ];
};

export type applicantType = {
  owId: string;
  name: string;
  email: string;
  phone: string;
  grade: number;
  about: string;
  preferences: {
    first: string;
    second: string;
    third: string;
  };
  bankom: "yes" | "no" | "maybe";
  feminIt: "yes" | "no";
  selectedTimes: [
    {
      start: string;
      end: string;
    },
  ];
  date: Date;
};

export type periodType = {
  _id: string;
  name: string;
  description: string;
  preparationPeriod: {
    start: Date;
    end: Date;
  };
  applicationPeriod: {
    start: Date;
    end: Date;
  };
  interviewPeriod: {
    start: Date;
    end: Date;
  };
  committees: string[];
};

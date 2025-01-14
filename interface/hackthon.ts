export interface HackathonData {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  totalParticipants: number;
  isRegistered: boolean;
  tags: string[];
  createdBy: string;
  createdAt: string;
  isEventEnd?: boolean;
}
export interface IHackathonResponseData {
  message: string;
  data?: HackathonData;
}

export interface IHackathonResponseAllData {
  message: string;
  data: HackathonData[] | null;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Catalog: undefined;
      Select: {
        movieId: string;
      };
      Ticket: {
        movieId: string;
        date: string;
        time: string;
        rows: string;
        seats: string;
      };
      MovieInfo: {
        id: string;
      };
    }
  }
}

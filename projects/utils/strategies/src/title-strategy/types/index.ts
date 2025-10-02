export type TitleStrategyHandler = (title: string) => string;
export type TitleStrategyConfig = {
  handler: TitleStrategyHandler;
};

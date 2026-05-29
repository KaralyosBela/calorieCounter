import { Label, Meter, Surface, Typography } from "@heroui/react";

//db-be lesz elmente a daily,heti,havo goal és a tab select változtatja majd ebbe az adatot

export const DailyGoalCard = () => {
  return (
    <Surface
      className="rounded-3xl p-4 shadow-lg flex flex-col gap-2"
      variant="default"
    >
      <Typography type="h5">Goals for the day</Typography>
      <Meter color="success" size="lg" value={776} minValue={0} maxValue={1000}>
        <Label>Protein</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="warning" size="lg" value={342} minValue={0} maxValue={1000}>
        <Label>Kcal</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Typography type="h5">Goals for the week</Typography>
      <Meter color="danger" size="lg" value={234} minValue={0} maxValue={1000}>
        <Label>Protein</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
      <Meter color="warning" size="lg" value={434} minValue={0} maxValue={1000}>
        <Label>Kcal</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    </Surface>
  );
};

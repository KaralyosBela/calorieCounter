type BarChartItem = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartItem[];
};

export const BarChart = ({ data }: BarChartProps) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Calories this week</h3>

      <div className="flex h-64 items-end gap-3">
        {data.map((item) => {
          const height = `${(item.value / maxValue) * 100}%`;

          return (
            <div
              key={item.label}
              className="flex h-full flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-full w-full items-end">
                <div
                  className="w-full rounded-t-xl bg-blue-500 transition-all"
                  style={{ height }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>

              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

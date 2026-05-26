import { Table } from "@heroui/react";
import { useFoods } from "../hooks/useFoods";
import dayjs from "dayjs";
// import { motion } from "framer-motion";

export const FoodTable = ({ searchValue }: any) => {
  const { foods } = useFoods();

  const filteredFoods = foods.filter((food: any) => {
    const value = searchValue.trim().toLowerCase();

    if (!value) return true;

    return (
      food.name.toLowerCase().includes(value) ||
      String(food.protein).includes(value) ||
      String(food.calories).includes(value)
    );
  });

  return (
    // <motion.div layout transition={{ duration: 1, ease: "circOut" }}>
    <Table className="overflow-hidden">
      <Table.ScrollContainer>
        <Table.Content aria-label="Food table">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column isRowHeader>Protein</Table.Column>
            <Table.Column isRowHeader>Calories</Table.Column>
            <Table.Column isRowHeader>Date</Table.Column>
          </Table.Header>

          <Table.Body>
            {filteredFoods.map((food: any) => (
              <Table.Row key={food.id}>
                <Table.Cell>{food.name}</Table.Cell>
                <Table.Cell>{food.protein}</Table.Cell>
                <Table.Cell>{food.calories}</Table.Cell>
                <Table.Cell>
                  {dayjs(food.createdAt).format("MMM D, HH:mm")}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
    // </motion.div>
  );
};

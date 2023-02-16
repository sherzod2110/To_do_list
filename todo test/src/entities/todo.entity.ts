import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "todo",
})
export class ToDoEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "todo_id",
  })
  id: string;

  @Column({
    name: "text",
  })
  text: string;
}
   
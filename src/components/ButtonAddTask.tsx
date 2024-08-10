import { IconButton } from "@material-tailwind/react";

export default function ButtonAddTask() {
  return (
    <IconButton
      color="deep-purple"
      className="rounded-full flex-wrap-reverse animate-slideInFromBelow"
    >
      <i className="fa-solid fa-pencil" />
    </IconButton>
  );
}

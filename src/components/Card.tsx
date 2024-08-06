import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const placeholder =
  "Ornare porttitor pellentesque, hac platea id, porttitor ipsum amet sed. Suspendisse ipsum ante, vel turpis dignissim, imperdiet eget phasellus ridiculus. Convallis ut eleifend, faucibus diam porttitor, eget bibendum nulla facilisis. Fermentum auctor dignissim, in lectus nunc, sed molestie pellentesque consequat. Gravida suspendisse sed, rutrum eget faucibus, quis morbi varius sit.";

export function SimpleCard({ task }) {
  return (
    <Card className=" mt-6 w-96 flex-wrap">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {task.title}
        </Typography>
        <Typography>{task.desc}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
  );
}

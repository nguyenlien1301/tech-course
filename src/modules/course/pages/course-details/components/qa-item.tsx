import { SendHorizontal } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui";
import { CourseQAData } from "@/shared/types/course.type";

interface QaItemProps {
  item: CourseQAData;
}
const QaItem = ({ item }: QaItemProps) => {
  return (
    <Accordion collapsible type="single">
      <AccordionItem value={item.question}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent className="flex items-center gap-3">
          <SendHorizontal className="size-5 text-secondary" />
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default QaItem;

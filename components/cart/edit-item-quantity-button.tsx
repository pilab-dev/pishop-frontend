"use client";

import { updateItemQuantity } from "@/components/cart/actions";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { CartItem } from "@pilab/pishop-client";
import clsx from "clsx";
import { useActionState } from "react";

function SubmitButton({ type }: { type: "plus" | "minus" }) {
  return (
    <button
      type="submit"
      aria-label={
        type === "plus" ? "Increase item quantity" : "Reduce item quantity"
      }
      className={clsx(
        "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80",
        {
          "ml-auto": type === "minus",
        },
      )}
    >
      {type === "plus" ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
}

export function EditItemQuantityButton({
  item,
  type,
  optimisticUpdate,
}: {
  item: CartItem;
  type: "plus" | "minus";
  optimisticUpdate: any;
}) {
  const [message, formAction] = useActionState(updateItemQuantity, null);
  const payload = {
    merchandiseId: item.merchandise!.id,
    quantity: type === "plus" ? item.quantity! + 1 : item.quantity! - 1,
  };
  const actionWithVariant = formAction.bind(null, {
    merchandiseId: item.merchandise!.id!,
    quantity: type === "plus" ? item.quantity! + 1 : item.quantity! - 1,
  });

  return (
    <form
      action={async () => {
        await optimisticUpdate(payload.merchandiseId, type);
        actionWithVariant();
      }}
    >
      <SubmitButton type={type} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}

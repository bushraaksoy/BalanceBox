'use client';

import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { Drawer } from 'vaul';

export default function VaulDrawer({
    title,
    description,
    trigger,
    children,
    isOpen,
    setIsOpen,
}) {
    // const [isOpen, setIsOpen] = useState(false);

    return (
        <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger className="outline-none">{trigger}</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/20" />
                <Drawer.Content className=" bg-white content fixed bottom-0 left-0 right-0 outline-none rounded-t-3xl px-5 pb-8 ">
                    <Drawer.Title className="pt-7 pb-3 font-semibold text-xl border-gray-200 border-b flex items-center justify-between">
                        <h1 className="">{title}</h1>
                        <IoClose
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            size={25}
                            className=""
                        />
                    </Drawer.Title>
                    <Drawer.Description>{description}</Drawer.Description>
                    <div className=" max-h-[80vh] overflow-y-scroll ">
                        {children}
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}

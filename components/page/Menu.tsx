"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { EyeIcon, PencilSquareIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Menu({ togglePreview }: { togglePreview?: (toggle: boolean) => void; }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (togglePreview) togglePreview(preview);
  }, [preview, togglePreview]);

  function MenuButton() {
    return (
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="absolute top-5 right-0 z-10 rounded-tl-lg rounded-bl-lg inline-flex items-center border border-transparent bg-primary-full p-1 text-white shadow-sm hover:bg-primary-hover focus:outline-none">
        {open ? <ChevronDoubleRightIcon className="m-1 h-5 w-5 pr-[1.5px]" aria-hidden="true" /> : <ChevronDoubleLeftIcon className="m-1 h-5 w-5 pr-[1.5px]" aria-hidden="true" />}
      </button>
    );
  }

  function PreviewButton() {
    return (
      <button
        type="button"
        onClick={() => setPreview(p => !p)}
        className="absolute top-20 right-0 z-10 rounded-tl-lg rounded-bl-lg inline-flex items-center border border-transparent bg-gray-600 p-1 text-white shadow-sm hover:bg-gray-700 focus:outline-none">
        {preview ? <PencilSquareIcon className="m-1 h-5 w-5 pr-[1.5px]" aria-hidden="true" /> : <EyeIcon className="m-1 h-5 w-5 pr-[1.5px]" aria-hidden="true" />}
      </button>
    );
  }

  return (
    <>
      {/* Buttons */}
      <MenuButton />
      <PreviewButton />
      {/* Side Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { }}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            leave="ease-in-out duration-500"
          >
            <div />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto relative w-96">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  leave="ease-in-out duration-500"
                >
                  <div className="absolute top-0 left-0 flex pt-4">
                    <MenuButton />
                    <PreviewButton />
                  </div>
                </Transition.Child>
                <div className="h-full overflow-y-auto bg-gray-800 p-8 pt-2.5">
                  <div className="space-y-6 pb-16">
                    {/* Title */}
                    <div>
                      <div className="mt-4 flex items-start justify-between">
                        <div className="font-medium">
                          <h2 className="text-lg text-white">
                            Ready to upload?
                          </h2>
                          <h3 className="text-sm text-gray-300">
                            Also consider creating an account.
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Components */}
                    <div className="flex">
                      <button
                        type="button"
                        className="flex-1 rounded-md border border-transparent bg-primary-full py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none"
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
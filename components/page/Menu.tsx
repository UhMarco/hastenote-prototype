"use client";

import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { EyeIcon, PencilSquareIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

export default function Menu({ onUpload, uploading, uploadError, togglePreview }: { onUpload: () => void, uploading?: boolean, uploadError?: boolean, togglePreview?: (toggle: boolean) => void; }) {
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
    <div className="fixed top-0 right-0 z-10">
      {/* Buttons */}
      <MenuButton />
      <PreviewButton />
      {/* Side Menu */}
      <Transition.Root show={open} as={Fragment}>
        <div className="relative z-10">
          <div className="fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="pointer-events-auto relative w-96">
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
                            This app is still <strong className="text-red-400">under development</strong> and is currently acting as a proof of concept.
                          </h3>
                        </div>
                      </div>
                    </div>
                    {/* Components */}
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => onUpload()}
                        className="flex-1 flex justify-center rounded-md border border-transparent bg-primary-full py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-hover focus:outline-none"
                      >

                        {uploading && <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                          viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path className="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                          </path>
                        </svg>}

                        Upload
                      </button>
                      {/* <button
                        type="button"
                        className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                      >
                        Sign in
                      </button> */}
                    </div>
                    {uploadError && <h3 className="text-sm text-red-400 mt-3">Something went wrong, please try again later...</h3>}
                    <h3 className="text-sm text-gray-300">
                      <strong>Known issues:</strong><br />
                      - After this menu has closed, a &quot;ghost&quot; blocking the editor is left behind.<br />
                      - No menu when viewing saved notes.<br />
                      <br />
                      <strong>Coming soon:</strong><br />
                      - Accounts<br />
                      - Managing and editing notes<br />
                      - Collaboration<br />
                    </h3>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition.Root>
    </div>
  );
}
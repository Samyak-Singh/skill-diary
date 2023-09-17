"use client"; // this registers <Editor> as a Client Component
import { generate_greeting_texts, getCreateRecordURL, getInitialContent } from "@/lib/util";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React from "react";

// Our <Editor> component we can reuse later
export default function Editor(props: any) {

    const { selectedDate, selectedDiary } = props;

    const session = useSession();
    const userId = session.data?.user?.id;

    const initialContent: PartialBlock[] | null = getInitialContent(generate_greeting_texts());    // const initialContent: string | null = null

    const [entry, setEntry] = React.useState<string | null>(null)


    // Creates a new editor instance.
    const editor: BlockNoteEditor | null = useBlockNote({
        onEditorContentChange: (editor) => {
            let content: any[] = []
            editor.forEachBlock((block) => (content.push(block), true))
            // console.log(content)
            setEntry(JSON.stringify(content))
        },
        onEditorReady(editor) {
            editor.focus();
        },
        initialContent: initialContent ? initialContent : undefined,
    });

    const handleClick = () => {
        const payload = {
            'date': selectedDate,
            'entry': entry,
            'diaryId': selectedDiary
        }

        const response = fetch(getCreateRecordURL(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        console.log(response.then(res => res.json()).then(data => console.log(data)));
    }

    // Renders the editor instance using a React component.
    return (
        <>
            {

                selectedDate && selectedDiary && (
                    <>
                        < BlockNoteView editor={editor} theme={"dark"} />
                        <div className='flex justify-center mt-5'>
                            <Button variant="outlined" onClick={handleClick}>
                                Save
                            </Button>
                        </div>
                    </>
                )
            }
        </>
    )
}
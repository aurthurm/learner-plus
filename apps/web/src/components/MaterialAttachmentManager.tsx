import React, { useState } from "react";
import { MaterialAttachment } from "@leaner/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, Trash, ArrowUp, ArrowDown, FileText } from "lucide-react";

interface MaterialAttachmentManagerProps {
  attachments: MaterialAttachment[];
  onChange: (attachments: MaterialAttachment[]) => void;
}

export function MaterialAttachmentManager({
  attachments,
  onChange,
}: MaterialAttachmentManagerProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [fileType, setFileType] = useState(".pdf");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Generate mock file metadata
    const cleanName = title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
    const mockFileName = `${cleanName}${fileType}`;
    const mockFileSize = `${(Math.random() * 4 + 1).toFixed(1)} MB`;

    const newAttachment: MaterialAttachment = {
      id: `att-${Date.now()}`,
      title: title.trim(),
      notes: notes.trim() || undefined,
      fileName: mockFileName,
      fileSize: mockFileSize,
      order: attachments.length + 1,
    };

    const updated = [...attachments, newAttachment];
    onChange(updated);

    // Reset inputs
    setTitle("");
    setNotes("");
  };

  const handleRemove = (id: string) => {
    const filtered = attachments.filter((att) => att.id !== id);
    // Re-index orders
    const reordered = filtered.map((att, idx) => ({
      ...att,
      order: idx + 1,
    }));
    onChange(reordered);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= attachments.length) return;

    const list = [...attachments];
    // Swap items
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Re-index orders
    const reordered = list.map((att, idx) => ({
      ...att,
      order: idx + 1,
    }));
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Add Resource File Attachment</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-slate-700">Attachment Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Algebra Practice Sheet"
              className="bg-white border-slate-200 text-xs h-9 rounded-lg"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-bold text-slate-700">File Type Extension</Label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full bg-white border border-slate-200 text-xs h-9 rounded-lg px-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value=".pdf">Document (.PDF)</option>
              <option value=".pptx">Presentation Slides (.PPTX)</option>
              <option value=".docx">Syllabus / Lesson Plan (.DOCX)</option>
              <option value=".xlsx">Marking / Grade Worksheet (.XLSX)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <Label className="text-[10px] font-bold text-slate-700">Brief Notes / Guidance (Optional)</Label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Read chapter 2 before completing this quiz."
            className="bg-white border-slate-200 text-xs h-9 rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleAdd}
            disabled={!title.trim()}
            size="sm"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] h-8 rounded-lg"
          >
            <Paperclip className="h-3 w-3 mr-1" /> Attach File
          </Button>
        </div>
      </div>

      {attachments.length > 0 ? (
        <div className="border border-slate-200/80 rounded-xl overflow-hidden bg-white">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <span>Attached Resources ({attachments.length})</span>
            <span>Sorted Order</span>
          </div>
          <div className="divide-y divide-slate-100">
            {attachments
              .sort((a, b) => a.order - b.order)
              .map((att, idx) => (
                <div key={att.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-start gap-2.5 pr-4 min-w-0">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0 mt-0.5">
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900 flex items-center gap-1.5 flex-wrap">
                        <span>{idx + 1}. {att.title}</span>
                        <span className="text-[9px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded border border-slate-200/80">
                          {att.fileName} ({att.fileSize})
                        </span>
                      </div>
                      {att.notes && (
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-normal italic">
                          💡 Notes: {att.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex flex-col gap-0.5">
                      <Button
                        type="button"
                        onClick={() => moveItem(idx, "up")}
                        disabled={idx === 0}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => moveItem(idx, "down")}
                        disabled={idx === attachments.length - 1}
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleRemove(att.id)}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="text-center p-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-[11px] text-slate-400">
          No resources attached. Students will only see the description text.
        </div>
      )}
    </div>
  );
}

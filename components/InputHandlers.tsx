import React from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';

interface CampaignFormProps {
  onSubmit: (emails: string[], subject: string, body: string) => void;
  isLoading?: boolean;
}

export const CampaignForm = ({ onSubmit, isLoading }: CampaignFormProps) => {
  const [emails, setEmails] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');

  const handleSubmit = () => {
    const emailList = emails
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    onSubmit(emailList, subject, body);
  };

  const isFormValid = emails.trim() && subject.trim() && body.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            📧 Email Addresses
          </label>
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="Enter email addresses (one per line):&#10;user1@example.com&#10;user2@example.com&#10;user3@example.com"
            className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none text-sm"
            disabled={isLoading}
          />
          <p className="text-xs text-slate-500 mt-2">Separate multiple emails with line breaks</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            📝 Email Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject..."
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            ✍️ Email Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email message/body content..."
            className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none text-sm"
            disabled={isLoading}
          />
        </div>

        <Button
          onClick={handleSubmit}
          fullWidth
          disabled={!isFormValid || isLoading}
          isLoading={isLoading}
        >
          Process & Verify Emails
        </Button>
      </div>
    </motion.div>
  );
};

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  isLoading?: boolean;
}

export const FileUpload = ({ onFilesSelected, isLoading }: FileUploadProps) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f =>
      f.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      f.type === 'application/vnd.ms-excel'
    );
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragging
          ? 'border-primary-600 bg-primary-50'
          : 'border-slate-300 bg-slate-50 hover:border-primary-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept=".xlsx,.xls"
        onChange={handleChange}
        className="hidden"
        id="file-upload"
        disabled={isLoading}
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="mb-3">
          <svg
            className="mx-auto h-12 w-12 text-slate-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 4v12m-6-6l6 6 6-6"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-base font-medium text-slate-900">Drag and drop your files here</p>
        <p className="text-sm text-slate-600 mt-1">or click to browse</p>
        <p className="text-xs text-slate-500 mt-2">Supported: XLS, XLSX files only</p>
      </label>
    </motion.div>
  );
};

interface TextInputProps {
  onEmailsEntered: (emails: string[]) => void;
  isLoading?: boolean;
}

export const TextInput = ({ onEmailsEntered, isLoading }: TextInputProps) => {
  const [text, setText] = React.useState('');

  const handleProcess = () => {
    const emails = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    onEmailsEntered(emails);
    setText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Or paste emails directly</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter emails (one per line):&#10;user1@example.com&#10;user2@example.com&#10;user3@example.com"
        className="w-full h-48 p-4 border border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none"
        disabled={isLoading}
      />
      <Button
        onClick={handleProcess}
        fullWidth
        className="mt-4"
        disabled={!text.trim() || isLoading}
        isLoading={isLoading}
      >
        Process Emails
      </Button>
    </motion.div>
  );
};

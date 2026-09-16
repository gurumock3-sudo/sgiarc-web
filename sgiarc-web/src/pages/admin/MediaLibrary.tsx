import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, FileIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const MediaLibrary: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from('media').list();
    if (data) setFiles(data);
    if (error) toast.error(error.message);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;

    setUploading(true);
    const { error } = await supabase.storage.from('media').upload(fileName, file);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Uploaded successfully');
      fetchFiles();
    }
    setUploading(false);
  };

  const deleteFile = async (name: string) => {
    if (confirm('Are you sure you want to delete this file?')) {
      const { error } = await supabase.storage.from('media').remove([name]);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted');
        fetchFiles();
      }
    }
  };

  const copyUrl = (name: string) => {
    const { data } = supabase.storage.from('media').getPublicUrl(name);
    navigator.clipboard.writeText(data.publicUrl);
    toast.success('URL copied to clipboard');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-bold text-gray-800">Media Library</h1>
        <div>
          <label className="btn btn-navy cursor-pointer flex items-center">
            <Upload size={18} className="mr-2" />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input type="file" className="hidden" onChange={uploadFile} disabled={uploading} />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {files.map(file => (
          <div key={file.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm group">
            <div className="h-32 bg-gray-100 flex items-center justify-center relative">
              {file.name.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img src={supabase.storage.from('media').getPublicUrl(file.name).data.publicUrl} alt={file.name} className="w-full h-full object-cover" />
              ) : (
                <FileIcon size={32} className="text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                <button onClick={() => copyUrl(file.name)} className="text-white hover:text-brand-lavender" title="Copy URL"><Copy size={20} /></button>
                <button onClick={() => deleteFile(file.name)} className="text-white hover:text-red-400" title="Delete"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-3 text-xs text-gray-600 truncate" title={file.name}>
              {file.name}
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded border border-gray-100">
            No media files found. Upload some!
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;

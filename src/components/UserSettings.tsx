import React from 'react';
import { UserSettings as UserSettingsType } from '../types';
import { User } from 'lucide-react';

interface UserSettingsProps {
  settings: UserSettingsType;
  onUpdateSettings: (settings: UserSettingsType) => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateSettings({ ...settings, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, name: e.target.value });
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="relative">
          {settings.avatar ? (
            <img
              src={settings.avatar}
              alt="User avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <span className="text-white text-xs">+</span>
          </label>
        </div>
        <input
          type="text"
          value={settings.name}
          onChange={handleNameChange}
          placeholder="Your name"
          className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};
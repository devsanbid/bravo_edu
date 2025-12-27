'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { teamService, TeamMember } from '@/lib/teamService';
import { Save, Upload, X, Trash2, Loader2, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TeamMembersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <TeamMembersContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function TeamMembersContent() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingMember, setEditingMember] = useState<Partial<TeamMember> | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await teamService.getTeamMembers();
      setMembers(data);
    } catch (error) {
      console.error('Failed to load team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!editingMember || !editingMember.name || !editingMember.role) {
      alert('Name and role are required');
      return;
    }

    try {
      setSaving(true);
      let updateData = { ...editingMember };

      // Upload image if changed
      if (imageFile) {
        // Delete old image if exists
        if (editingMember.imageFileId) {
          await teamService.deleteImage(editingMember.imageFileId);
        }
        const { fileId, fileName } = await teamService.uploadImage(imageFile);
        updateData.imageFileId = fileId;
        updateData.imageFileName = fileName;
      }

      if (editingMember.$id) {
        // Update existing
        await teamService.updateTeamMember(editingMember.$id, updateData);
      } else {
        // Create new
        await teamService.createTeamMember(updateData);
      }

      alert('Team member saved successfully!');
      setEditingMember(null);
      setImageFile(null);
      setImagePreview(null);
      loadMembers();
    } catch (error) {
      console.error('Failed to save team member:', error);
      alert('Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Delete ${member.name}?`)) return;

    try {
      // Delete image if exists
      if (member.imageFileId) {
        await teamService.deleteImage(member.imageFileId);
      }
      await teamService.deleteTeamMember(member.$id);
      alert('Team member deleted successfully!');
      loadMembers();
    } catch (error) {
      console.error('Failed to delete team member:', error);
      alert('Failed to delete team member');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setImagePreview(member.imageFileName ? teamService.getImageUrl(member.imageFileName) : null);
    setImageFile(null);
  };

  const handleCancel = () => {
    setEditingMember(null);
    setImageFile(null);
    setImagePreview(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Team Members
          </h1>
          <p className="text-gray-600 mt-2">Manage your team members</p>
        </div>
        {!editingMember && (
          <button
            onClick={() => setEditingMember({ name: '', role: '', order: 0 })}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Add Team Member
          </button>
        )}
      </div>

      {editingMember ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {editingMember.$id ? 'Edit Team Member' : 'Add Team Member'}
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position/Role *
                </label>
                <input
                  type="text"
                  value={editingMember.role || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Senior Consultant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingMember.email || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingMember.phone || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="+977 9851234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={editingMember.linkedin || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, linkedin: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                <input
                  type="number"
                  value={editingMember.order || 0}
                  onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Message/Bio
              </label>
              <textarea
                value={editingMember.message || ''}
                onChange={(e) => setEditingMember({ ...editingMember, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Brief bio or message from the team member..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      {imagePreview ? 'Change Photo' : 'Upload Photo'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? 'Saving...' : 'Save Team Member'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <motion.div
              key={member.$id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {member.imageFileName && (
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={teamService.getImageUrl(member.imageFileName)}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                {member.message && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.message}</p>
                )}
                {(member.email || member.phone || member.linkedin) && (
                  <div className="text-sm text-gray-500 space-y-1 mb-4">
                    {member.email && <div>📧 {member.email}</div>}
                    {member.phone && <div>📱 {member.phone}</div>}
                    {member.linkedin && <div>💼 LinkedIn</div>}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!editingMember && members.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No team members yet. Add your first team member!</p>
        </div>
      )}
    </div>
  );
}

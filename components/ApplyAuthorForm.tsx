'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

export default function ApplyAuthorForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [bio, setBio] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name || !email || !mobile || !bio || !resumeUrl || !agreeTerms) {
      setError('Please fill in all fields and agree to the terms.');
      return;
    }

    // Validate mobile number format
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("bio", bio);
    formData.append("resume", resumeUrl)

    try {
      const response = await fetch('/api/author/apply', {
        method: 'POST',
       
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // Reset form fields
        setName('');
        setEmail('');
        setMobile('');
        setBio('');
        setResumeUrl('');
        setAgreeTerms(false);
        console.log('Succeeded: ', result.data);
      } else {
        setError(result.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Author Application</h2>
            <p className="text-gray-600">Fill out the form to join our writing team</p>
          </div>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="you@example.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Please double-check your email, as it will be used for communication.</p>
            </div>

            {/* Mobile Number Input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                placeholder="Enter your 10-digit mobile number"
                required
              />
            </div>

            {/* Bio Input */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Short Professional Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 resize-none"
                placeholder="This will be needed when creating your author profile"
                required
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">Max 500 characters recommended.</p>
            </div>

            {/* Resume Upload with Cloudinary */}
            <div className="space-y-2">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                Resume (PDF)
              </label>
              <CldUploadWidget
                uploadPreset="resume_upload"
               
                onSuccess={({ info }) => {
                  setResumeUrl(info.secure_url);
                  console.log('Uploaded resume URL: ', info.secure_url);
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="flex items-center justify-center w-full px-4 py-2 border border-dashed border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50 hover:border-blue-700 transition duration-300"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    {resumeUrl ? 'Resume Uploaded' : 'Upload Resume'}
                  </button>
                )}
              </CldUploadWidget>
              {resumeUrl && (
                <p className="text-xs text-gray-500 mt-1">Uploaded: {resumeUrl.split('/').pop()}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <span className="ml-2 text-sm text-gray-700">
                  I agree to the terms and conditions
                </span>
              </label>
            </div>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="mr-2 w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
              <CheckCircle2 className="mr-2 w-5 h-5" />
              <p className="text-sm">Application submitted successfully! Redirecting...</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Recipe } from '@/types/recipe';

type FormDataKeys = Exclude<keyof Recipe, 'id' | 'createdAt' | 'updatedAt'>;

interface FormField {
  name: FormDataKeys;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'array' | 'file';
  options?: string[];
  placeholder?: string;
}

const EditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Recipe>>({});

  const formFields: FormField[] = [
    { name: 'title', label: 'Recipe Title', type: 'text', placeholder: 'Enter recipe title' },
    { name: 'time', label: 'Cooking Time', type: 'text', placeholder: 'e.g., 30 minutes' },
    { name: 'servings', label: 'Servings', type: 'text', placeholder: 'e.g., 4 servings' },
    { name: 'calories', label: 'Calories', type: 'text', placeholder: 'e.g., 500 kcal' },
    { name: 'image', label: 'Recipe Image', type: 'file' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: ['Pastas', 'Lunch', 'Dinner', 'Dessert', 'Breakfast'],
    },
    {
      name: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: ['Easy', 'Medium', 'Hard'],
    },
    { name: 'cuisine', label: 'Cuisine', type: 'text', placeholder: 'e.g., Italian' },
    { name: 'rating', label: 'Rating', type: 'number', placeholder: 'Enter rating (0-5)' },
    { name: 'reviews', label: 'Reviews Count', type: 'number', placeholder: 'Enter number of reviews' },
    { name: 'steps', label: 'Steps', type: 'array', placeholder: 'Add cooking step' },
];

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (!recipeId) throw new Error('Recipe ID is missing');

        const response = await fetch(`/api/recipes/${recipeId}`);
        if (!response.ok) throw new Error('Recipe not found');

        const data = await response.json();
        setRecipe(data);
        setFormData(data);
      } catch (error) {
        setError('Failed to fetch recipe');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (name: FormDataKeys, value: string | File) => {
    if (name === 'image' && value instanceof File) {
      try {
        const base64 = await convertToBase64(value);
        setImagePreview(base64);
        setFormData({ ...formData, [name]: base64 });
      } catch (error) {
        console.error('Error converting image:', error);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleStepAdd = (step: string) => {
    setFormData((prev) => ({
      ...prev,
      steps: [...(prev.steps || []), step],
    }));
  };

  const handleStepRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeId) {
      setError('Recipe ID is missing');
      return;
    }
  
    try {
      const updatedData = {
        ...formData,
        id: parseInt(recipeId),
        image: imagePreview || formData.image,
        rating: Number(formData.rating) || 0,
        reviews: Number(formData.reviews) || 0,
        updatedAt: new Date(),
      };
  
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error('Update failed');
      router.push('/admin');
    } catch (error) {
      setError('Failed to update recipe');
      console.error(error);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'select':
        return (
          <select value={formData[field.name] as string} onChange={(e) => handleInputChange(field.name, e.target.value)} className="w-full p-2 border rounded">
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'array':
        return (
          <div className="space-y-2">
            {formData.steps?.map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...(formData.steps || [])];
                    newSteps[index] = e.target.value;
                    setFormData((prev) => ({ ...prev, steps: newSteps }));
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button type="button" onClick={() => handleStepRemove(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                  Remove
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={field.placeholder}
                className="flex-1 p-2 border rounded"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      handleStepAdd(input.value.trim());
                      input.value = '';
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    handleStepAdd(input.value.trim());
                    input.value = '';
                  }
                }}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Add Step
              </button>
            </div>
          </div>
        );

      case 'file':
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleInputChange(field.name, file);
              }}
              className="w-full p-2 border rounded"
            />
            {(imagePreview || formData.image) && (
              <div className="relative w-full h-40 mt-2">
                <Image
                  src={imagePreview || formData.image || ''}
                  alt="Preview"
                  fill
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] as string}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full p-2 border rounded"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-500">{error}</p>
          <button onClick={() => router.push('/admin')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Return to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.back()} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Back
          </button>
          <h1 className="text-3xl font-bold">Edit Recipe</h1>
        </div>
        {recipe && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                  {renderField(field)}
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => router.push('/admin')} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPage;

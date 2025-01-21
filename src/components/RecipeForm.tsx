'use client';
import { FormEvent, useState } from 'react';

interface Recipe {
  id?: string;
  title: string;
  time: string;
  servings: string;
  calories: string;
  image: string;
  category: string;
  difficulty: string;
  cuisine: string;
  steps: string[];
  rating: string;
  reviews: string;
}

interface RecipeFormProps {
  isEditing: boolean;
  recipe?: Recipe;
  onCancel: () => void;
}

type FormDataKeys = Exclude<keyof Recipe, 'id'>;

interface FormField {
  name: FormDataKeys;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea' | 'array' | 'file';
  options?: string[];
  placeholder?: string;
}

const RecipeForm = ({ isEditing, recipe, onCancel }: RecipeFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formFields: FormField[] = [
    {
      name: 'title',
      label: 'Recipe Title',
      type: 'text',
      placeholder: 'Enter recipe title',
    },
    {
      name: 'time',
      label: 'Cooking Time',
      type: 'text',
      placeholder: 'e.g., 30 minutes',
    },
    {
      name: 'servings',
      label: 'Servings',
      type: 'text',
      placeholder: 'e.g., 4 servings',
    },
    {
      name: 'calories',
      label: 'Calories',
      type: 'text',
      placeholder: 'e.g., 500 kcal',
    },
    {
      name: 'image',
      label: 'Recipe Image',
      type: 'file',
      placeholder: 'Select an image',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'],
    },
    {
      name: 'difficulty',
      label: 'Difficulty',
      type: 'select',
      options: ['Easy', 'Medium', 'Hard'],
    },
    {
      name: 'cuisine',
      label: 'Cuisine',
      type: 'text',
      placeholder: 'e.g., Italian',
    },
    {
      name: 'steps',
      label: 'Steps',
      type: 'array',
      placeholder: 'Add cooking step',
    },
  ];

  const [formData, setFormData] = useState<Recipe>({
    title: recipe?.title || '',
    time: recipe?.time || '',
    servings: recipe?.servings || '',
    calories: recipe?.calories || '',
    image: recipe?.image || '',
    category: recipe?.category || '',
    difficulty: recipe?.difficulty || '',
    cuisine: recipe?.cuisine || '',
    steps: recipe?.steps || [],
    rating: '0',
    reviews: '0',
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      onCancel();
    } catch (error) {
      console.error('Error:', error);
    }
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
      steps: [...prev.steps, step],
    }));
  };

  const handleStepRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
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
            {formData.steps.map((step, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => {
                    const newSteps = [...formData.steps];
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
            {(imagePreview || formData.image) && <img src={imagePreview || formData.image} alt="Preview" className="mt-2 h-40 object-cover rounded" />}
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      {formFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {renderField(field)}
        </div>
      ))}
      <div className="flex gap-4 pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {isEditing ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;

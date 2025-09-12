import type { RequestHandler } from '@sveltejs/kit';

// In-memory categories array
let categories: { id: number; name: string }[] = [
  { id: 1, name: 'Fiction' },
  { id: 2, name: 'Non-fiction' }
];

// GET /api/categories - return categories list
export const GET: RequestHandler = async () => {
  return new Response(JSON.stringify(categories), { status: 200 });
};

// POST /api/categories - add new category
export const POST: RequestHandler = async ({ request }) => {
  const newCategory = await request.json();

  if (!newCategory.name) {
    return new Response(
      JSON.stringify({ error: 'Category name is required' }),
      { status: 400 }
    );
  }

  const id = Date.now();
  categories.push({ id, name: newCategory.name });

  return new Response(
    JSON.stringify({ success: true, message: 'Category added', id }),
    { status: 201 }
  );
};

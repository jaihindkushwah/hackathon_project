const mockUser = {
  id: "1",
  name: "John Doe",
  email: "admin@super-mind.com",
  // add placeholder image
  img: "https://via.placeholder.com/150",
  registerAt: new Date(),
  lastLogin: new Date(),
};

export function GET() {
  return Response.json(
    {
      message: "Successfully fetched user profile data",
      data: mockUser,
    },
    { status: 200 }
  );
}

import { NextApiRequest, NextApiResponse } from 'next';
import UsuarioModel from 'models/usuario';
import { hashPassword, comparePassword } from 'infra/password';
import { generateToken } from 'infra/jwt';

export async function register(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      nome,
      email,
      password,
      city,
      state,
      interestArea,
      availability,
      modality,
      role
    } = req.body;

    // Validations
    if (!nome || !email || !password || !city || !state) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existingUser = await UsuarioModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await UsuarioModel.create({
      nome,
      email,
      password: hashedPassword,
      city,
      state,
      interestArea,
      availability,
      modality,
      role: role === 'ong' ? 'ong' : 'volunteer'
    });

    // Generate JWT token
    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });
    
    // Auto-login the user
    res.setHeader('Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_NUMBER || 86400}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    );

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, password } = req.body;

    // Validations
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await UsuarioModel.findByEmail(email);

    if (!user || (!user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = await generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.setHeader('Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRATION_NUMBER || 86400}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`
  );

  return res.status(200).json({ message: 'Logout successful' });
}

export default {
  register,
  login,
  logout
};

import prisma from '../../lib/database';
import { isValidEmail } from '../../lib/utils';

export async function post({ request }) {
  try {
    const data = await request.json();
    const { email } = data;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Please provide a valid email address' 
        }), 
        { status: 400 }
      );
    }
    
    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: {
        email
      }
    });
    
    if (existing) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'This email is already subscribed' 
        }), 
        { status: 400 }
      );
    }
    
    // Add new subscriber
    await prisma.subscriber.create({
      data: {
        email
      }
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Successfully subscribed!' 
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'An error occurred while processing your request' 
      }), 
      { status: 500 }
    );
  }
}
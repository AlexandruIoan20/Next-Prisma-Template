import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; 
import prisma from '../../libs/prisma'; 

export const POST = async (request: Request) => { 
    try { 
        const { username, email, password }  = await request.json(); 

        if(!username || !email  || !password) { 
            return new NextResponse("Missing Info", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12); 
        const user = await prisma.user.create({ 
            data: { 
                username, 
                email, 
                password: hashedPassword, 
            }
        }); 

        return NextResponse.json(user); 
    } catch(err: any) { 
        console.log(err); 
        return new NextResponse(err, { status: 500 }); 
    }
}

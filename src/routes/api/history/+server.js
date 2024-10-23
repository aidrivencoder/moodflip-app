import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/database';

export async function POST({ request }) {
    const { sessionId, situation, response } = await request.json();
    
    const flip = await prisma.flipHistory.create({
        data: {
            sessionId,
            situation,
            response
        }
    });
    
    return json(flip);
}

export async function GET({ url }) {
    const sessionId = url.searchParams.get('sessionId');
    
    const history = await prisma.flipHistory.findMany({
        where: {
            sessionId: sessionId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    
    return json(history);
}

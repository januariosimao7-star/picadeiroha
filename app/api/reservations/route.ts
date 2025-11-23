import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: NextRequest) {
  try {
    // Buscar todas as reservas do banco de dados
    const reservations = await prisma.reservation.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Transformar dados para o formato esperado pelo frontend
    const formattedReservations = reservations.map(res => ({
      id: res.id,
      clientName: res.user?.name || 'Sem nome',
      professor: 'Professor', // Pode ser melhorado com mais dados no schema
      horses: res.horse ? [res.horse] : [],
      lessonType: res.type === 'individual' ? 'individual' : 'group' as 'individual' | 'group',
      date: res.date.toISOString().split('T')[0],
      startTime: res.time,
      duration: (res.type === 'individual' ? 30 : 60) as 30 | 60,
      status: res.status === 'confirmed' ? 'confirmed' : res.status === 'pending' ? 'pending' : 'cancelled' as 'confirmed' | 'pending' | 'cancelled',
    }));

    return NextResponse.json(formattedReservations);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    // Retornar array vazio em caso de erro
    return NextResponse.json([]);
  }
}


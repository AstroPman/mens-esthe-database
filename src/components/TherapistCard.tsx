import React from 'react';
import { Star, Ruler, User } from 'lucide-react';
import type { Therapist } from '../types';

interface TherapistCardProps {
  therapist: Therapist;
}

export function TherapistCard({ therapist }: TherapistCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={therapist.img}
          alt={therapist.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-xl font-semibold text-white mb-1">
            {therapist.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white">{therapist.score.toFixed(1)}点</span>
            <span className="text-gray-400">({therapist.reviews}件)</span>
          </div>
          
          <div className="space-y-1 text-gray-300 text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {therapist.age}歳
              </span>
              <span className="flex items-center">
                <Ruler className="w-4 h-4 mr-1" />
                {therapist.height}cm
              </span>
              <span>{therapist.bra_size}カップ</span>
            </div>
            <p className="text-purple-400">
              {therapist.salon_name}
            </p>
            <p className="text-gray-400 text-xs">
              {therapist.area}
            </p>
            <div className="grid grid-cols-3 gap-1 mt-2">
              {therapist.skr > 0 && (
                <div className="text-center bg-purple-500/20 rounded px-2 py-1">
                  <div className="font-semibold">{therapist.skr}%</div>
                  <div className="text-xs">SKR</div>
                </div>
              )}
              {therapist.hj > 0 && (
                <div className="text-center bg-purple-500/20 rounded px-2 py-1">
                  <div className="font-semibold">{therapist.hj}%</div>
                  <div className="text-xs">HJ</div>
                </div>
              )}
              {therapist.f > 0 && (
                <div className="text-center bg-purple-500/20 rounded px-2 py-1">
                  <div className="font-semibold">{therapist.f}%</div>
                  <div className="text-xs">F</div>
                </div>
              )}
              {therapist.nn > 0 && (
                <div className="text-center bg-purple-500/20 rounded px-2 py-1">
                  <div className="font-semibold">{therapist.nn}%</div>
                  <div className="text-xs">NN</div>
                </div>
              )}
              {therapist.ns > 0 && (
                <div className="text-center bg-purple-500/20 rounded px-2 py-1">
                  <div className="font-semibold">{therapist.ns}%</div>
                  <div className="text-xs">NS</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300" />
    </div>
  );
}
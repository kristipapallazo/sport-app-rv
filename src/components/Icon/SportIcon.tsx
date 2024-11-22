import { ReactNode } from "react";

import {
  GiSoccerBall,
  GiBasketballBasket,
  GiTennisRacket,
  GiHockey,
  GiTennisBall,
  GiPoolTriangle,
  GiCricketBat,
  GiDart,
  GiSoccerField,
  GiBoxingGloveSurprise,
  GiBoxingGlove,
  GiAmericanFootballHelmet,
  GiVolleyballBall,
  GiCycling,
  GiGolfTee,
  GiWaterPolo,
  GiCurlingStone,
  GiBasketballBall,
} from "react-icons/gi";
import { FaBowlingBall, FaMotorcycle, FaTableTennis, FaVolleyballBall, FaChess } from "react-icons/fa";
import {
  MdSportsHandball,
  MdSportsBaseball,
  MdOutlineSportsRugby,
  MdOutlineSports,
  MdPool,
  MdSportsHockey,
  MdSportsKabaddi,
} from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
import { PiMotorcycleFill, PiSoccerBallFill } from "react-icons/pi";

interface SportIconsObj {
  [k: string]: ReactNode;
}

const SPORT_ICONS_OBJ: SportIconsObj = {
  Soccer: <GiSoccerBall />,
  Basketball: <GiBasketballBasket />,
  Baseball: <MdSportsBaseball />,
  "Ice Hockey": <GiHockey />,
  Tennis: <GiTennisBall />,
  Handball: <MdSportsHandball />,
  Rugby: <MdOutlineSportsRugby />,
  "American Football": <GiAmericanFootballHelmet />,
  Snooker: <GiPoolTriangle />,
  "Table tennis": <FaTableTennis />,
  Cricket: <GiCricketBat />,
  Darts: <GiDart />,
  Volleyball: <FaVolleyballBall />,
  "Beach Volley": <GiVolleyballBall />,
  Futsal: <GiSoccerField />,
  Badminton: <GiTennisRacket />,
  Bowls: <FaBowlingBall />,
  MMA: <GiBoxingGloveSurprise />,
  Boxing: <GiBoxingGlove />,
  "BR Sports": <MdOutlineSports />,
  "Formula 1": <IoCarSportOutline />,
  "Motor sport": <FaMotorcycle />,
  "Motorcycle Racing": <PiMotorcycleFill />,
  Cycling: <GiCycling />,
  Golf: <GiGolfTee />,
  Waterpolo: <GiWaterPolo />,
  Pool: <MdPool />,
  "Field Hockey": <MdSportsHockey />,
  "Beach Soccer": <PiSoccerBallFill />,
  Curling: <GiCurlingStone />,
  Chess: <FaChess />,
  "Basketball 3x3": <GiBasketballBall />,
  Kabaddi: <MdSportsKabaddi />,
};

export default SPORT_ICONS_OBJ;

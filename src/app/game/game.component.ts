import { Component, OnInit } from '@angular/core';
import { Tile } from '../_model/tile';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  tiles: Tile[] = [];
  tilesNumber = 32;
  score = 0;
  gameOver = false;

  constructor() { }

  ngOnInit() {
    this.createTiles();
  }

  createTiles() {
    this.tiles = [];

    let normalColor = this.generateNormalColor();
    let changedColor = this.generateChangedColor(normalColor);

    const changedTile = this.randomNumber(1, this.tilesNumber);

    for (let i = 1; i <= this.tilesNumber; i++) {
      const tile = new Tile();
      tile.different = false;
      tile.color = normalColor;
      if (i === changedTile) {
        tile.color = changedColor;
        tile.different = true;
      }
      tile.id = i;
      this.tiles.push(tile);
    }
  }

  generateNormalColor() {
    let rgbArray = [this.randomNumber(0, 255), this.randomNumber(0, 255), this.randomNumber(0, 255)];
    return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
  }

  generateChangedColor(color: string) {
    let rgbArray = color.replace('rgb(', '').replace(')', '').split(',');
    rgbArray[this.randomNumber(0, 2)] = this.randomNumber(0, 255).toString();
    return 'rgb(' + rgbArray[0] + ',' + rgbArray[1] + ',' + rgbArray[2] + ')';
  }

  randomNumber(low: number, high: number) {
    return Math.round(Math.random() * (high - low) + low);
  }

  onTile(different: boolean) {
    if (different === true) {
      this.score++;
      this.createTiles();
    } else {
      this.gameOver = true;
      // this.saveScore();
    }
  }

  saveScore() {
    let list = [];
    list.push(this.score);
    let joined = list.join('\r\n');
    let blob = new Blob([joined], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'score.txt');
  }

}

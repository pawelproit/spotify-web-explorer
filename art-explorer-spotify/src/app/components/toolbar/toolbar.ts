import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyUser } from '../../interfaces/spotify-user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss']
})


export class Toolbar {
  @Input() userInfo: SpotifyUser | null = null;
  @Input() searchQuery: string = '';

  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() searchArtist = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  onSubmit() {
    this.searchArtist.emit(this.searchQuery);
  }

  onLogoutClick() {
    this.logout.emit();
  }

  onSearchQueryChange(value: string) {
    this.searchQueryChange.emit(value);
  }
}

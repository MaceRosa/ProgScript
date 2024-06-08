const { createApp } = Vue;

createApp({
    data() {
        return {
            characters: [],
            loading: true,
            searchText: '',
            nextPage: 1,
            totalPages: null
        }
    },
    computed: {
        filteredCharacter() {
            const searchText = this.searchText.toLowerCase();
            return this.characters.filter(character => {
                return character.name.toLowerCase().includes(searchText) || character.status.toLowerCase().includes(searchText) || character.species.toLowerCase().includes(searchText);
            });
        }
    },
    created() {
        console.log('Component created');
        this.fetchCharacter();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async fetchCharacter() {
            console.log('Fetching characters...');
            this.loading = true;
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${this.nextPage}`);
                const data = await response.json();
                this.characters = [...this.characters, ...data.results];
                this.nextPage++;
                this.totalPages = data.info.pages;
                console.log('Characters fetched:', data.results);
                if (this.nextPage <= this.totalPages) {
                    this.fetchCharacter();
                }
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                this.loading = false;
            }
        },  
        getStatus(status) {
            const statusMap = {
                Alive: 'alive',
                Dead: 'dead',
                unknown: 'unknown'
            }
            return statusMap[status] || '';
        },
        handleScroll() {
            const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
            if (bottomOfWindow && !this.loading && this.nextPage <= this.totalPages) {
                this.loading = true;
                this.fetchCharacter();
            }
        }
    }
}).mount("#app");

<template>
  <v-container
      fluid
      class="session-body"
  >
    <v-row dense>
      <template v-for="(item, index) in items">
        <v-col
            :key="index"
            :cols="getDisplayCol($vuetify)"
        >
          <v-hover v-slot="{ hover }">
            <Card
                rounded="lg"
                elevation="24"
                :color="isDarkMode($vuetify) ? '#424242' : '#E0E0E0'"
            >
              <template v-slot:title>
                <v-icon large>{{ getTunnelingBodyTitleIcon(item) }}</v-icon>
                <h4>{{ item.host }}</h4>
                <v-spacer />
                <div v-show="hover" >
                  <v-btn icon small>
                    <v-icon>{{ Defs.ICON_CONNECTION }}</v-icon>
                  </v-btn>
                  <v-btn icon small>
                    <v-icon>{{ Defs.ICON_CARD_TEXT }}</v-icon>
                  </v-btn>
                  <v-btn
                      icon
                      small
                      @click="onClickDelete(item)"
                  ><v-icon>{{ Defs.ICON_CARD_REMOVE }}</v-icon>
                  </v-btn>
                </div>
              </template>

              <template v-slot:text>
                <h4>{{ getTunnelingBodyText(item) }}</h4>
              </template>
            </Card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions} from 'vuex'
import { Card } from '@/components/Layout'

export default {
  name: "SessionBody",
  components: {
    Card
  },
  data: () => {
    return {
      items: [],
      isMenu: false
    }
  },
  computed: {
    ...mapState({ Defs: 'Constants', state: 'PortForwarding' }),
    ...mapGetters('Vuetify', ['isDarkMode']),
    ...mapGetters('PortForwarding', ['getTunnelingBodyTitleIcon', 'getTunnelingBodyText', 'getDisplayCol'])
  },
  watch: {
    state: {
      handler () {
        if (this.state.arrTunneling.length > 0) {
          this.items = this.state.arrTunneling
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('PortForwarding', ['setSelectID']),
    onClickDelete (session) {
      const id = session.id

      if (id > 0) {
        this.setSelectID(id)
        this.$emit('msgClickDeleteButton')
      }
    }
  }
}
</script>

<style scoped>
.session-body {
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.session-body::-webkit-scrollbar {
  display:none;
}
</style>

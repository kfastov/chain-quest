export const ABI = [
    {
      "type": "impl",
      "name": "ChainQuestRootImpl",
      "interface_name": "chain_quest_contract::root::interface::IChainQuestRoot"
    },
    {
      "type": "struct",
      "name": "core::byte_array::ByteArray",
      "members": [
        {
          "name": "data",
          "type": "core::array::Array::<core::bytes_31::bytes31>"
        },
        {
          "name": "pending_word",
          "type": "core::felt252"
        },
        {
          "name": "pending_word_len",
          "type": "core::integer::u32"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::integer::u256",
      "members": [
        {
          "name": "low",
          "type": "core::integer::u128"
        },
        {
          "name": "high",
          "type": "core::integer::u128"
        }
      ]
    },
    {
      "type": "interface",
      "name": "chain_quest_contract::root::interface::IChainQuestRoot",
      "items": [
        {
          "type": "function",
          "name": "register_game_contract",
          "inputs": [
            {
              "name": "game_contract",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "update_player_stats",
          "inputs": [
            {
              "name": "player",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "stats",
              "type": "core::felt252"
            },
            {
              "name": "value",
              "type": "core::felt252"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "emit_gameplay_event",
          "inputs": [
            {
              "name": "event_id",
              "type": "core::felt252"
            },
            {
              "name": "event_data",
              "type": "core::byte_array::ByteArray"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "grant_achievement",
          "inputs": [
            {
              "name": "player",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "achievement_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "get_player_stats",
          "inputs": [
            {
              "name": "player",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "game_contract",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "stats",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::felt252"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "impl",
      "name": "OwnableImpl",
      "interface_name": "openzeppelin_access::ownable::interface::IOwnable"
    },
    {
      "type": "interface",
      "name": "openzeppelin_access::ownable::interface::IOwnable",
      "items": [
        {
          "type": "function",
          "name": "owner",
          "inputs": [],
          "outputs": [
            {
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "transfer_ownership",
          "inputs": [
            {
              "name": "new_owner",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "renounce_ownership",
          "inputs": [],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "impl",
      "name": "ERC1155Impl",
      "interface_name": "openzeppelin_token::erc1155::interface::IERC1155"
    },
    {
      "type": "struct",
      "name": "core::array::Span::<core::starknet::contract_address::ContractAddress>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::starknet::contract_address::ContractAddress>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<core::integer::u256>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::integer::u256>"
        }
      ]
    },
    {
      "type": "struct",
      "name": "core::array::Span::<core::felt252>",
      "members": [
        {
          "name": "snapshot",
          "type": "@core::array::Array::<core::felt252>"
        }
      ]
    },
    {
      "type": "enum",
      "name": "core::bool",
      "variants": [
        {
          "name": "False",
          "type": "()"
        },
        {
          "name": "True",
          "type": "()"
        }
      ]
    },
    {
      "type": "interface",
      "name": "openzeppelin_token::erc1155::interface::IERC1155",
      "items": [
        {
          "type": "function",
          "name": "balance_of",
          "inputs": [
            {
              "name": "account",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "token_id",
              "type": "core::integer::u256"
            }
          ],
          "outputs": [
            {
              "type": "core::integer::u256"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "balance_of_batch",
          "inputs": [
            {
              "name": "accounts",
              "type": "core::array::Span::<core::starknet::contract_address::ContractAddress>"
            },
            {
              "name": "token_ids",
              "type": "core::array::Span::<core::integer::u256>"
            }
          ],
          "outputs": [
            {
              "type": "core::array::Span::<core::integer::u256>"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "safe_transfer_from",
          "inputs": [
            {
              "name": "from",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "to",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "token_id",
              "type": "core::integer::u256"
            },
            {
              "name": "value",
              "type": "core::integer::u256"
            },
            {
              "name": "data",
              "type": "core::array::Span::<core::felt252>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "safe_batch_transfer_from",
          "inputs": [
            {
              "name": "from",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "to",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "token_ids",
              "type": "core::array::Span::<core::integer::u256>"
            },
            {
              "name": "values",
              "type": "core::array::Span::<core::integer::u256>"
            },
            {
              "name": "data",
              "type": "core::array::Span::<core::felt252>"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        },
        {
          "type": "function",
          "name": "is_approved_for_all",
          "inputs": [
            {
              "name": "owner",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "operator",
              "type": "core::starknet::contract_address::ContractAddress"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        },
        {
          "type": "function",
          "name": "set_approval_for_all",
          "inputs": [
            {
              "name": "operator",
              "type": "core::starknet::contract_address::ContractAddress"
            },
            {
              "name": "approved",
              "type": "core::bool"
            }
          ],
          "outputs": [],
          "state_mutability": "external"
        }
      ]
    },
    {
      "type": "impl",
      "name": "SRC5Impl",
      "interface_name": "openzeppelin_introspection::interface::ISRC5"
    },
    {
      "type": "interface",
      "name": "openzeppelin_introspection::interface::ISRC5",
      "items": [
        {
          "type": "function",
          "name": "supports_interface",
          "inputs": [
            {
              "name": "interface_id",
              "type": "core::felt252"
            }
          ],
          "outputs": [
            {
              "type": "core::bool"
            }
          ],
          "state_mutability": "view"
        }
      ]
    },
    {
      "type": "constructor",
      "name": "constructor",
      "inputs": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress"
        },
        {
          "name": "base_uri",
          "type": "core::byte_array::ByteArray"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle",
      "kind": "struct",
      "members": [
        {
          "name": "operator",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "from",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "to",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "id",
          "type": "core::integer::u256",
          "kind": "data"
        },
        {
          "name": "value",
          "type": "core::integer::u256",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch",
      "kind": "struct",
      "members": [
        {
          "name": "operator",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "from",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "to",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "ids",
          "type": "core::array::Span::<core::integer::u256>",
          "kind": "data"
        },
        {
          "name": "values",
          "type": "core::array::Span::<core::integer::u256>",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll",
      "kind": "struct",
      "members": [
        {
          "name": "owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "operator",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "approved",
          "type": "core::bool",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc1155::erc1155::ERC1155Component::URI",
      "kind": "struct",
      "members": [
        {
          "name": "value",
          "type": "core::byte_array::ByteArray",
          "kind": "data"
        },
        {
          "name": "id",
          "type": "core::integer::u256",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_token::erc1155::erc1155::ERC1155Component::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "TransferSingle",
          "type": "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferSingle",
          "kind": "nested"
        },
        {
          "name": "TransferBatch",
          "type": "openzeppelin_token::erc1155::erc1155::ERC1155Component::TransferBatch",
          "kind": "nested"
        },
        {
          "name": "ApprovalForAll",
          "type": "openzeppelin_token::erc1155::erc1155::ERC1155Component::ApprovalForAll",
          "kind": "nested"
        },
        {
          "name": "URI",
          "type": "openzeppelin_token::erc1155::erc1155::ERC1155Component::URI",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      "kind": "struct",
      "members": [
        {
          "name": "previous_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        },
        {
          "name": "new_owner",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "key"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "OwnershipTransferred",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
          "kind": "nested"
        },
        {
          "name": "OwnershipTransferStarted",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
          "kind": "nested"
        }
      ]
    },
    {
      "type": "event",
      "name": "openzeppelin_introspection::src5::SRC5Component::Event",
      "kind": "enum",
      "variants": []
    },
    {
      "type": "event",
      "name": "chain_quest_contract::root::contract::ChainQuestRoot::GameplayEvent",
      "kind": "struct",
      "members": [
        {
          "name": "game_contract",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "event_id",
          "type": "core::felt252",
          "kind": "data"
        },
        {
          "name": "event_data",
          "type": "core::byte_array::ByteArray",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "chain_quest_contract::root::contract::ChainQuestRoot::AchievementUnlocked",
      "kind": "struct",
      "members": [
        {
          "name": "game_contract",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "player",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "achievement_id",
          "type": "core::integer::u256",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "chain_quest_contract::root::contract::ChainQuestRoot::PlayerStatsUpdated",
      "kind": "struct",
      "members": [
        {
          "name": "game_contract",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "player",
          "type": "core::starknet::contract_address::ContractAddress",
          "kind": "data"
        },
        {
          "name": "stats",
          "type": "core::felt252",
          "kind": "data"
        },
        {
          "name": "value",
          "type": "core::felt252",
          "kind": "data"
        }
      ]
    },
    {
      "type": "event",
      "name": "chain_quest_contract::root::contract::ChainQuestRoot::Event",
      "kind": "enum",
      "variants": [
        {
          "name": "ERC1155Event",
          "type": "openzeppelin_token::erc1155::erc1155::ERC1155Component::Event",
          "kind": "flat"
        },
        {
          "name": "OwnableEvent",
          "type": "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
          "kind": "flat"
        },
        {
          "name": "SRC5Event",
          "type": "openzeppelin_introspection::src5::SRC5Component::Event",
          "kind": "flat"
        },
        {
          "name": "GameplayEvent",
          "type": "chain_quest_contract::root::contract::ChainQuestRoot::GameplayEvent",
          "kind": "nested"
        },
        {
          "name": "AchievementUnlocked",
          "type": "chain_quest_contract::root::contract::ChainQuestRoot::AchievementUnlocked",
          "kind": "nested"
        },
        {
          "name": "PlayerStatsUpdated",
          "type": "chain_quest_contract::root::contract::ChainQuestRoot::PlayerStatsUpdated",
          "kind": "nested"
        }
      ]
    }
  ] as const;
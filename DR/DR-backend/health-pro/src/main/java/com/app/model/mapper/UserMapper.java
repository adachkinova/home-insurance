package com.app.model.mapper;

import com.app.dto.UserDTO;
import com.app.model.model.User;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    User userDTOToUser(UserDTO userDto);

    UserDTO userToUserDTO(User user);

}
